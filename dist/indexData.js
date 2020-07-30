"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("@elastic/elasticsearch");
const cohort_centric_json_1 = __importDefault(require("./assets/cohort_centric.json"));
const transformed_data_json_1 = __importDefault(require("./assets/transformed_data.json"));
const INDEX = "demo_index";
const esClient = new elasticsearch_1.Client({
    node: "http://localhost:9200",
});
exports.initIndexMapping = (index, esClient) => __awaiter(void 0, void 0, void 0, function* () {
    const serializedIndexName = index.toLowerCase();
    yield esClient.indices.putMapping({
        index: serializedIndexName,
        body: cohort_centric_json_1.default.mappings,
    });
});
const sleep = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 500);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield esClient.indices
        .delete({
        index: INDEX,
    })
        .catch((err) => console.log("index already exists"))
        .then(sleep);
    yield esClient.indices
        .create({
        index: INDEX,
        body: cohort_centric_json_1.default,
    })
        .catch((err) => console.log("create"))
        .then(sleep);
    yield Promise.all(transformed_data_json_1.default.map((cohort, i) => {
        try {
            return esClient.index({
                index: INDEX,
                body: cohort,
            });
        }
        catch (err) {
            console.log("i: ", i);
            throw err;
        }
    }));
}))();
//# sourceMappingURL=indexData.js.map