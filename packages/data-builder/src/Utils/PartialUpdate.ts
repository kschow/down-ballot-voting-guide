
const partialUpdate = (func: (one, two) => void) => {
    return (one: string) => (two: string):void => func(one, two);
};

export default partialUpdate;
