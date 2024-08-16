import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceFingerprintService {

  getDeviceFingerprint(): string {
    const fingerprintComponents = [
      this.getUserAgent(),
      this.getPlatform(),
      this.getLanguage(),
      this.getScreenResolution(),
      this.getTimezoneOffset(),
      this.getHardwareConcurrency(),
      this.getMemory(),
      this.getPlugins(),
      this.getCanvasFingerprint(),
       this.getWebGLFingerprint()
    ];

    const fingerprintString = fingerprintComponents.join('###');

    return this.hash(fingerprintString);
  }

  private getUserAgent(): string {
    return navigator.userAgent;
  }

  private getPlatform(): string {
    return navigator.platform;
  }

  private getLanguage(): string {
    return navigator.language;
  }

  private getScreenResolution(): string {
    return `${window.screen.width}x${window.screen.height}`;
  }

  private getTimezoneOffset(): string {
    return new Date().getTimezoneOffset().toString();
  }

  private getHardwareConcurrency(): string {
    return navigator.hardwareConcurrency?.toString() || 'unknown';
  }

  private getMemory(): string {
    return (navigator as any).deviceMemory?.toString() || 'unknown';
  }

  private getPlugins(): string {
    return Array.from(navigator.plugins)
      .map(plugin => plugin.name)
      .join(',');
  }

  private getCanvasFingerprint(): string {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        context.textBaseline = 'top';
        context.font = '14px Arial';
        context.textBaseline = 'alphabetic';
        context.fillStyle = '#f60';
        context.fillRect(125, 1, 62, 20);
        context.fillStyle = '#069';
        context.fillText('Hello, world!', 2, 15);
        context.fillStyle = 'rgba(102, 204, 0, 0.7)';
        context.fillText('Hello, world!', 4, 17);
        //console.log(canvas.toDataURL());
        return canvas.toDataURL();
      }
    } catch (e) {
      return 'unsupported';
    }
    return 'unsupported';
  }

  private getWebGLFingerprint(): string {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') as WebGLRenderingContext ||
        canvas.getContext('experimental-webgl') as WebGLRenderingContext;
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          return `${vendor}~${renderer}`;
        } else {
          return 'No WEBGL_debug_renderer_info support';
        }
      }
    } catch (e) {
      return 'unsupported';
    }
    return 'unsupported';
  }

  private hash(input: string): string {
    let hash = 0, i, chr;
    for (i = 0; i < input.length; i++) {
      chr = input.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  }
}
