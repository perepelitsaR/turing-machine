"use strict;"
class TuringMachine{
    constructor(memory, transitions, initialState){
        /* memory это массив символов [0,1,0,..]
           transitions  массив объектов {
            State0: q0,
            Char0: c0,
            State1: q1,
            Char1: c1,
            Direction1: d
        }, q0 - номер начального состояния, q1 - номер конечного состояния;
		c0 - входной символ, c1 - выходной символ,
		d={L,R,S} - задает направление
		initial state - номер начального состояния
		-1 - константа, задающая номер конечного состояния, при котором машина завершает работу.
		*/
        this.memory = [];
        this.memory.push("*");
        for(let i = 0; i < memory.length; i++){
            this.memory.push(memory[i]);
        }
        this.memory.push("*");

        this.transitions = transitions;
        this.initialState = initialState;
        this.currentState = this.initialState;
        this.currentIndex = 1;
    }

    _readByte(index){
        if(index < 1 || index >= this.memory.length)
        {
            return '*';//lambda
        }
        return this.memory[index];
    }

    _writeByte(index, byte){
        if (index < 1 || index >= this.memory.length)
        {
            return;
        }
        this.memory[index] = byte;
    }

    work(timeLimit = 1000){
        /*
         * запускает машину. Работает, пока не перейдет в состояние -1 либо не пройдет указанное количество милисекунд
         * Если выход происходит из-за того, что время истекло, то выкидывает исключение
         */
        this.currentState = this.initialState;
        this.currentIndex = 1;
        let start = new Date();
        let elapsed = new Date() - start;
        while (elapsed < timeLimit)
        {
            if (this.currentState === -1)//Final state
            {
                return;
            }

            let ch = this._readByte(this.currentIndex);
            for(let i = 0; i < this.transitions.length; i++)
            {
                let transition = this.transitions[i];
                if (transition.State0 === this.currentState && transition.Char0 === ch)
                {
                    this.currentState = transition.State1;
                    this._writeByte(this.currentIndex, transition.Char1);
                    switch (transition.Direction1)
                    {
                        case 'L': this.currentIndex--; break;
                        case 'R': this.currentIndex++; break;
                    }
                    break;
                }
            }
            elapsed = new Date() - start;
        }
        throw new Error("Time elapsed");
    }

    getResult(){
        return this.memory;
    }
}