export function validate(object, schema) {
    return schema.validate(object, { abortEarly: false });
};
