const required = { value: true, message: "Campo obbligatorio" };

export const VALIDATION = {
  medicalDay: {
    province: { required },
    contract: { required },
    date: { required },
    patients: {},
  },
};
