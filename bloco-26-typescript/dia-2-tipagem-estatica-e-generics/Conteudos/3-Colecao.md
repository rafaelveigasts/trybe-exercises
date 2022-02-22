## Tipos de coleção

**Arrays**

Arrays são um conjunto de valores de mesmo tipo. Para declará-los, você pode adicionar o tipo esperado do array com a sintaxe let arrayName: type[] = [...];
Copiar
let names: string[] = ["Mary Joe", "Alan Joe"];

**Tuplas**

Tuplas permitem declarar um conjunto de valores cuja ordem e tipo dos valores são fixas. Em JavaScript, elas são representadas como arrays (por isso a semelhança!), mas são estruturas diferentes. Por exemplo, você pode querer representar um valor como um par de uma string e um número .

Para declarar uma tupla , use a sintaxe variableName: [type, type, ...] :

let fullName: [string, string] = ["Jane", "Doe"];
let person: [string, number] = ["Jane Doe", 35];
let car: [string, string, number] = ["Ford", "F400", 10];

