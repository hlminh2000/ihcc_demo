"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const toEsDocument = (allData) => {
    const randomSampleTypeDistribution = [
        "saliva",
        "blood",
        "blood",
        "blood",
        "stool",
        "stool",
        "stool",
        "stool",
        "urine",
        "urine",
    ];
    return (raw, i) => {
        var _a, _b, _c, _d, _e;
        const toSpaceCase = (str) => str.split("_").join(" ");
        const additionalBiosampleTypeCounts = Math.floor(Math.random() * 2) + 1;
        const randomAdditionalSamples = lodash_1.default.range(0, additionalBiosampleTypeCounts).map(() => {
            const index = Math.floor(Math.random() * randomSampleTypeDistribution.length);
            return randomSampleTypeDistribution[index];
        });
        const sanitizeName = (name) => {
            return Object.entries({
                "√∂": "ö",
                "√•": "å",
                "√§": "ä",
                "√ò": "O",
                "√¶": "ae",
            }).reduce((name, [key, value]) => name === null || name === void 0 ? void 0 : name.split(key).join(value), name);
        };
        try {
            const output = {
                cohort_name: raw.cohort_name,
                countries: ((_a = raw.countries) === null || _a === void 0 ? void 0 : _a.map((country) => {
                    if (country === "") {
                        if (raw.cohort_name === "NICCC") {
                            return "USA";
                        }
                    }
                    return ({
                        "Republic of Korea": "South Korea",
                        "South Korea": "South Korea",
                        Korea: "South Korea",
                    }[country] || country);
                })) || [],
                current_enrollment: raw.current_enrollment || 0,
                basic_cohort_attributes: Object.values(raw.basic_cohort_attributes || {})
                    .reduce((acc, attributes) => [...acc, ...(attributes || [])], [])
                    .map(toSpaceCase),
                biosample: {
                    biosample_variables: [],
                    sample_types: lodash_1.default(((_b = raw.biosample) === null || _b === void 0 ? void 0 : _b.sample_type) || [])
                        .concat(randomAdditionalSamples)
                        .uniq()
                        .value(),
                },
                available_data_types: raw.available_data_types || {
                    biospecimens: false,
                    environmental_data: false,
                    genomic_data: false,
                    phenotypic_clinical_data: false,
                },
                laboratory_measures: {
                    genomic_variables: [],
                    microbiology: (((_c = raw.laboratory_measures) === null || _c === void 0 ? void 0 : _c.microbiology) || []).map(toSpaceCase),
                },
                pi_lead: raw.pi_lead ? sanitizeName(raw.pi_lead) : "",
                questionnaire_survey_data: {
                    socio_demographic_and_economic_characteristics: (raw.questionnaire_survey_data
                        .socio_demographic_and_economic_characteristics || []).map(toSpaceCase),
                    lifestyle_and_behaviours: (raw.questionnaire_survey_data.lifestyle_and_behaviours || []).map(toSpaceCase),
                    physiological_measurements: [
                        ...(((_d = raw.questionnaire_survey_data.physiological_measurements) === null || _d === void 0 ? void 0 : _d.anthropometry) || []),
                        ...(((_e = raw.questionnaire_survey_data.physiological_measurements) === null || _e === void 0 ? void 0 : _e.circulation_and_respiration) || []),
                    ].map(toSpaceCase),
                },
                website: {
                    "Korean Genome and Epidemiology Study (KoGES)": "http://www.cdc.go.kr/contents.es?mid=a50401010100",
                    "Golestan Cohort Study": "https://dceg2.cancer.gov/gemshare/studies/GCS/",
                }[raw.cohort_name || ""] || raw.website,
            };
            console.log("output: ", output);
            return output;
        }
        catch (err) {
            console.log("err: ", err);
            throw err;
        }
    };
};
const raw = require("../api/assets/raw_data.json");
const output_dir = "../api/assets/transformed_data.json";
const output = raw.map(toEsDocument(raw));
console.log("output: ", output);
fs_1.default.writeFileSync(output_dir, JSON.stringify(output, null, 2));
//# sourceMappingURL=transformDocs.js.map