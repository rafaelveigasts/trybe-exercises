// ./volume.ts

import utils from "./utils";

const units = ["km³", "hm³", "dam³", "m³", "dm³", "cm³", "mm³"];

function makeError(unity: string) {
    throw new Error(`A unidade ${unity} não é uma unidade válida.`)
}

function convert(value: number, forUnity: string, toUnity: string): number {

    return utils.convert(units, value, forUnity, toUnity);
}