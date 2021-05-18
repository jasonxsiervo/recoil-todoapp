import { DefaultValue } from "recoil";
import { atom, selector } from "recoil";

export const Fahrenheit = atom({
    key: 'Fahrenheit',
    default: 32,
});


export const getCelsius = selector({
    key: 'getCelsius',
    get: ({get}) => {
        return Math.round(((get(Fahrenheit) - 32) * 5) / 9)
    },
    set: ({set}, newValue) => {
        set(Fahrenheit, newValue instanceof DefaultValue ? newValue : ((newValue * 9) / 5) + 32)
    }
});

