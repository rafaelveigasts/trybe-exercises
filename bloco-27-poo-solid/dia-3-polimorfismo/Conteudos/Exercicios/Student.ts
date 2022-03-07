// Student.ts

import Enrollable from './Enrollable';
import {Person} from './Person';
import EvaluationResult from './EvaluationResult';

export default class Student extends Person implements Enrollable {
    private _testingsResults: any;
    sumAverageGrades(): any {
      throw new Error("Method not implemented.");
    }
    sumGrades(): any {
      throw new Error("Method not implemented.");
    }
    private _enrollment: string = String();
    private _evaluationsResults: EvaluationResult[];

    constructor(name: string, birthDate: Date) {
        super(name, birthDate);
        this.enrollment = this.generateEnrollment();
        this._evaluationsResults = [];
    }

    get enrollment(): string {
        return this._enrollment;
    }

    set enrollment(value: string) {
        if (value.length < 16) {
            throw new Error('A matrícula deve possuir no mínimo 16 caracteres.');
        }

        this._enrollment = value;
    }

    get evaluationsResults(): EvaluationResult[] {
        return this._evaluationsResults;
    }

    sumNotes(): number {
        return [...this._testingsResults]
            .reduce((previousNote, note) => note + previousNote, 0);
    }

    sumAverageNotes(): number {
        const sumNotes = this.sumNotes();
        const divider = this._testingsResults.length;

        return Math.round(sumNotes / divider);
    }

    generateEnrollment(): string {
        const randomStr = String(Date.now() * (Math.random() + 1)).replace(/\W/g, '');

        return `STU${randomStr}`;
    }

    addEvaluationResult(value: EvaluationResult): void {
        this._evaluationsResults.push(value);
    }

}