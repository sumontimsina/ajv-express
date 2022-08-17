import { VALIDATION_ERRORS } from '../errors/errorMessages';
import Ajv, { JSONSchemaType } from 'ajv';
const ajv = new Ajv({
    allErrors: true,
    verbose: true,
});
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';
addFormats(ajv);
ajvErrors(ajv /*,{ singleError: true }*/);

interface UserSchema {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
}

const userSchema: JSONSchemaType<UserSchema> = {
    type: 'object',
    properties: {
        first_name: {
            type: 'string',
            nullable: false,
            minLength: 4,
            maxLength: 20,
            errorMessage: {
                minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 4 character`,
                maxLength: VALIDATION_ERRORS.MAX_LENGTH,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        last_name: {
            type: 'string',
            nullable: false,
            minLength: 4,
            maxLength: 20,
            errorMessage: {
                minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 4 characters`,
                maxLength: `${VALIDATION_ERRORS.MIN_LENGTH} 10 characters`,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        phone_number: {
            type: 'string',
            nullable: false,
            minLength: 10,
            maxLength: 10,
            errorMessage: {
                minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 10 numbers`,
                maxLength: `${VALIDATION_ERRORS.MAX_LENGTH} 10 numbers`,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        email: {
            type: 'string',
            format: 'email',
            nullable: false,
            minLength: 4,
            maxLength: 20,
            errorMessage: {
                format: `${VALIDATION_ERRORS.FORMAT} Email`,
                minLength: `${VALIDATION_ERRORS.MIN_LENGTH} 4 characters`,
                maxLength: `${VALIDATION_ERRORS.MIN_LENGTH} 10 characters`,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
        password: {
            type: 'string',
            // eslint-disable-next-line no-useless-escape
            pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})`,
            nullable: false,
            errorMessage: {
                pattern: `${VALIDATION_ERRORS.PATTERN}`,
                type: `${VALIDATION_ERRORS.TYPE} String`,
            },
        },
    },
    required: ['first_name', 'password', 'phone_number', 'last_name', 'email'],
    additionalProperties: false,
};

export const validateUser = ajv.compile(userSchema);
