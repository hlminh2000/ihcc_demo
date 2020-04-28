import fs from "fs";

type MappingShape = {
  cohort_autocomplete?: string;
  cohort_name?: string;
  countries: string[];
  pi_lead?: string;
  website?: string;
  available_data_types?: {
    genomic_data: boolean;
    environmental_data: boolean;
    biospecimens: boolean;
    phenotypic_clinical_data: boolean;
  };
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
  available_data_types?: {
    genomic_data: boolean;
    environmental_data: boolean;
    biospecimens: boolean;
    phenotypic_clinical_data: boolean;
  };
  basic_cohort_attributes?: {
    [k: string]: string[] | null;
  };
  biosample?: {
    sample_type?: string[];
  };
  laboratory_measures?: {
    microbiology?: string[];
  };
  questionnaire_survey_data: {
    lifestyle_and_behaviours?: string[];
    physiological_measurements?: {
      anthropometry?: string[];
      circulation_and_respiration?: string[];
    };
    socio_demographic_and_economic_characteristics?: string[];
  };
};

const toEsDocument = (raw: Raw, i: number): MappingShape => {
  try {
    const output = {
      cohort_name: raw.cohort_name,
      countries: raw.countries || [],
      basic_cohort_attributes: Object.values(
        raw.basic_cohort_attributes || {}
      ).reduce<string[]>(
        (acc, attributes) => [...acc, ...(attributes || [])],
        []
      ),
      biosample: {
        biosample_variables: [],
        sample_types: raw.biosample?.sample_type || [],
      },
      available_data_types: raw.available_data_types || {
        biospecimens: false,
        environmental_data: false,
        genomic_data: false,
        phenotypic_clinical_data: false,
      },
      laboratory_measures: {
        genomic_variables: [],
        microbiology: raw.laboratory_measures?.microbiology || [],
      },
      pi_lead: raw.pi_lead,
      questionnaire_survey_data: {
        socio_demographic_and_economic_characteristics:
          raw.questionnaire_survey_data
            .socio_demographic_and_economic_characteristics || [],
        lifestyle_and_behaviours:
          raw.questionnaire_survey_data.lifestyle_and_behaviours || [],
        physiological_measurements: [
          ...(raw.questionnaire_survey_data.physiological_measurements
            ?.anthropometry || []),
          ...(raw.questionnaire_survey_data.physiological_measurements
            ?.circulation_and_respiration || []),
        ],
      },
      website: raw.website,
    };
    console.log("output: ", output);
    return output;
  } catch (err) {
    console.log("err: ", err);
    throw err;
  }
};

const raw: Raw[] = require("../api/assets/raw_data.json");
const output_dir = "../api/assets/transformed_data.json";
const output = raw.map(toEsDocument);
console.log("output: ", output);

fs.writeFileSync(output_dir, JSON.stringify(output, null, 2));
