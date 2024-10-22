
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWGBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9ccXRTRmlfWUJ0X0M=');  // Вставьте свой лицензионный ключ сюда


platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err))