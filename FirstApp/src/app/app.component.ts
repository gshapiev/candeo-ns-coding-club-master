import { Component, ViewChild } from '@angular/core';
import { TerminalComponent } from './terminal/terminal.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FirstApp';
  @ViewChild('terminal1') terminal;

  async run() {
    let v1 = await this.terminal.ReadLine("Enter Value 1: ");
    if(isNaN(v1))
    {
      this.terminal.WriteLine("Not a number")
      return;
    }
    let v2 = await this.terminal.ReadLine("Enter Value 2: ");
    this.terminal.WriteLine(v1 + v2);
  }

}
