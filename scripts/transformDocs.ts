import fs from "fs";

type MappingShape = {
  cohort_autocomplete?: string;
  cohort_name?: string;
  countries: string[];
  pi_lead?: string;
  website?: string;
  data_types: string[];
  basic_cohort_attributes: string[];
  biosample: {
    sample_types: string[];
    biosample_variables: string[];
  };
  laboratory_measures: {
    genomic_variables: string[];
    microbiology: string[];
  };
  questionnaire_survey_data: {
    lifestyle_and_behaviours: string[];
    physiological_measurements: string[];
    socio_demographic_and_economic_characteristics: string[];
  };
};

type Raw = {
  prefix?: string;
  cohort_name?: string;
  countries?: string[];
  pi_lead?: string;
  website?: string;
  datatypes?: string[];
  "basic cohort attributes"?: string[];
  biosample?: {
    "sample type"?: string[];
  };
  "laboratory measures"?: {
    microbiology?: string[];
  };
  "questionnaire/survey data":
    | string[]
    | {
        "lifestyle and behaviours"?: string[];
        "physiological measurements"?: {
          anthropometry?: string[];
          "circulation and respiration"?: string[];
        };
        "socio-demographic and economic characteristics"?: string[];
      };
};

const toEsDocument = (raw: Raw): MappingShape => {
  return {
    cohort_name: raw.cohort_name,
    countries: raw.countries || [],
    basic_cohort_attributes: raw["basic cohort attributes"] || [],
    biosample: {
      biosample_variables: [],
      sample_types: raw.biosample?.["sample type"] || [],
    },
    data_types: raw.datatypes || [],
    laboratory_measures: {
      genomic_variables: [],
      microbiology: raw["laboratory measures"]?.microbiology || [],
    },
    pi_lead: raw.pi_lead,
    questionnaire_survey_data: Array.isArray(raw["questionnaire/survey data"])
      ? {
          socio_demographic_and_economic_characteristics: [],
          lifestyle_and_behaviours: [],
          physiological_measurements: [],
        }
      : {
          socio_demographic_and_economic_characteristics:
            raw["questionnaire/survey data"][
              "socio-demographic and economic characteristics"
            ] || [],
          lifestyle_and_behaviours:
            raw["questionnaire/survey data"]["lifestyle and behaviours"] || [],
          physiological_measurements: [
            ...(raw["questionnaire/survey data"]["physiological measurements"]
              ?.anthropometry || []),
            ...(raw["questionnaire/survey data"][
              "physiological measurements"
            ]?.["circulation and respiration"] || []),
          ],
        },
    website: raw.website,
  };
};

const raw: Raw[] = require("../api/assets/raw_data.json");
const output_dir = "../api/assets/transformed_data.json";
const output = raw.map(toEsDocument);

fs.writeFileSync(output_dir, JSON.stringify(output, null, 2));

console.log(output);
