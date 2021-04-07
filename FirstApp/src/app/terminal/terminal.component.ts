import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  get body() { return this._body; }

  ngOnInit(): void {
    this._body = " > "
  }

  print(t) {
    this._body += t + "\n > ";
    this.scrollToBottom();
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
}
