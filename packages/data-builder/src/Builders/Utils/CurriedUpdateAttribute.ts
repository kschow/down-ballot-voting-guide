const applyUpdateToAttribute = <T>(
    update: (base: T) => void,
    obj: T,
    attr: string,
    value: string
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
                return (val: string):void => {
                    applyFunc(update, obj, attr, val);
                };
            };
        };
    };
};

const curriedUpdateAttribute = curryUpdate(applyUpdateToAttribute);

export default curriedUpdateAttribute;
