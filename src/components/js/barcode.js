// import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

// export default {
//   data() {
//     return {
//       codeReader: null,
//       videoDevices: [],
//       selectedDeviceId: null,
//       result: '',
//       product: null,
//     };
//   },
//   mounted() {
//     this.initBarcodeReader();
//   },
//   methods: {
//     async initBarcodeReader() {
//       this.codeReader = new BrowserMultiFormatReader();
//       try {
//         const videoInputDevices = await this.codeReader.getVideoInputDevices();
//         this.videoDevices = videoInputDevices;
//         if (videoInputDevices.length > 0) {
//           this.selectedDeviceId = videoInputDevices[0].deviceId;
//         }
//         if (videoInputDevices.length > 1) {
//           this.$refs.sourceSelect.style.display = 'block';
//         }
//       } catch (error) {
//         console.error('Error initializing barcode reader:', error);
//       }
//     },
//     async startScanning() {
//       try {
//         await this.codeReader.decodeFromVideoDevice(this.selectedDeviceId, this.$refs.video, (result, err) => {
//           if (result) {
//             this.result = result.text;
//             this.fetchProduct(result.text);
//           } else if (err) {
//             if (err instanceof NotFoundException) {
//               console.log('No barcode found');
//             } else {
//               console.error('Barcode scanning error:', err);
//             }
//           }
//         });
//       } catch (error) {
//         console.error('Error starting barcode scanning:', error);
//       }
//     },
//     resetScanner() {
//       this.codeReader.reset();
//       this.result = '';
//     },
//     async fetchProduct(id) {
//       try {
//         // Replace this with your API endpoint
//         console.log(id);
//         // this.product = await response.json();
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     }
//   }
// };