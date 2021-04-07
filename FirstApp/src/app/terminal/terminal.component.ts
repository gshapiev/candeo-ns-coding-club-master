import { Component, Input, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
  
export class TerminalComponent implements OnInit {
  @Input() height = 100;
  @Input() width = 100
  @ViewChild('target') private myScrollContainer: ElementRef;  
  
  constructor() { 
  }
  private _body = "";
  get body() { return this._body + this._input + (this._inputStarted ? "|" : ""); }

  ngOnInit(): void {
    this._body = " > "
  }

  WriteLine(t) {
    this._body += t + "\n > ";
    this.scrollToBottom();
  }

  Write(t) {
    this._body += t;
    this.scrollToBottom();
  }


  private _input = "";
  private _inputStarted = false;
  async ReadLine(t) {
    this.Write(t);
    this._input = "";
    var input = await this.getUserInput(this)
    this._input = "";
    this.WriteLine(input)
    return input;
  }

  getUserInput(target) {
    target._input = "|";
    var isStarted = true;
    var inputString = "";
    return new Promise((resolve, reject) => {
      window.onkeypress = function(e) {
        if(isStarted) {
          if(e.keyCode == 13) {
            isStarted = false;
            resolve(inputString);
            return false;
          } else {
            inputString += e.key;
            target._input = inputString + "|";
          }
        }
      };
    });
  }

  @HostListener('window:keypress', ['$event'])
  onKeyPress(event) {
    if(this._inputStarted) {
      if(event.keyCode == 13) {
        this._inputStarted = false;
      } else {
        this._input += event.key;
      }
    }
  }
  
  
  clear() {
    this._body = " > ";
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  async doTimer() {
    while(this._inputStarted) {
        await delay(1000);
    }
  }
}

function delay(delay: number) {
  return new Promise(r => {
      setTimeout(r, delay);
  })
}