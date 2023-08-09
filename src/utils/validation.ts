const required = { value: true, message: "Campo obbligatorio" };

export const VALIDATION = {
  medicalDay: {
    province: { required },
    contract: { required },
    date: { required },
    patients: {},
  },
  certificate: {
    eligibility: {},
    eligibilityRenew: { required },
    prescription: { required },
    file: { required },
  },
};
