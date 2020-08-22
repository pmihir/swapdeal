import { Component } from "@angular/core";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private notifier: NotifierService) {}

  showNotification(type, message) {
    console.log("in notifiaction");
    return new Promise((resolve, reject) => {
      this.notifier.notify(type, message);
      setTimeout(function () {
        resolve();
      }, 1000);
    });
  }
}
