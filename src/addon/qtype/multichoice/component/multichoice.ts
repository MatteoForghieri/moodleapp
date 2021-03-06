// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { CoreLoggerProvider } from '@providers/logger';
import { CoreQuestionBaseComponent } from '@core/question/classes/base-question-component';
let $;
/**
 * Component to render a multichoice question.
 */
@Component({
    selector: 'addon-qtype-multichoice',
    templateUrl: 'addon-qtype-multichoice.html'
})
export class AddonQtypeMultichoiceComponent extends CoreQuestionBaseComponent implements OnInit, AfterViewInit {

    constructor(logger: CoreLoggerProvider, injector: Injector) {
        super(logger, 'AddonQtypeMultichoiceComponent', injector);
    }
    ngAfterViewInit(): void {
        var answers = this.question.options.filter((x)=> (x.text as string).includes("<img"))
        if(answers.length==4){
            var items = document.getElementsByClassName("quiz-item")
            if(items.length==4){
                for(var i = 0; i<items.length; i++)
                    items[i].classList.add("item-image")
            }
        } 
    }

    /**
     * Component being initialized.
     */
    ngOnInit(): void {
        this.initMultichoiceComponent();
    }

    /**
     * Clear selected choices.
     */
    clear(): void {
        this.question.singleChoiceModel = null;
    }
}
