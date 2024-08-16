import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DeviceFingerprintService} from "./device-fingerprint-service.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fingerprint';

  fingerprint: string;

  constructor(private deviceFingerprintService: DeviceFingerprintService) {
    this.fingerprint = this.deviceFingerprintService.getDeviceFingerprint();
    alert(this.fingerprint)
  }
}
