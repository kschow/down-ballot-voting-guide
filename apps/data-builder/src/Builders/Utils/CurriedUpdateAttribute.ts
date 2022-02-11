import FormUpdateType from '../../Fields/FormUpdateType';

const applyUpdateToAttribute = <T>(
    update: (base: T) => void,
    obj: T,
    attr: string,
    value: FormUpdateType
) => {
    update({
        ...obj,
        [attr]: value
    });
};

const curryUpdate = <T>(applyFunc) => {
    return (update: (base: T) => void) => {
        return (obj: T) => {
            return (attr: string) => {
                return (val: FormUpdateType):void => {
                    applyFunc(update, obj, attr, val);
                };
            };
        };
    };
};

const curriedUpdateAttribute = curryUpdate(applyUpdateToAttribute);

export default curriedUpdateAttribute;
