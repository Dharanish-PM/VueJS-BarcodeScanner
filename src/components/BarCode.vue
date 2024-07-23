<!-- <template>
<div>
    <h1>Scan Barcode</h1>
    <div v-if="videoDevices.length > 1">
      <label for="sourceSelect">Change video source:</label>
      <select v-model="selectedDeviceId" id="sourceSelect" style="max-width: 400px;">
        <option v-for="device in videoDevices" :key="device.deviceId" :value="device.deviceId">
          {{ device.label }}
        </option>
      </select>
    </div>
    <div>
      <video ref="video" width="600" height="400" style="border: 1px solid gray;"></video>
    </div>
    <button @click="startScanning">Start</button>
    <button @click="resetScanner">Reset</button>
    <div>
      <label>Result:</label>
      <pre><code>{{ result }}</code></pre>
    </div>
    <table v-if="product">
      <thead>
        <tr>
          <th>Product Code</th>
          <th>Product Name</th>
          <th>Product Type</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script src="./js/barcode.js"></script>

<style scoped>
.result {
  margin-top: 10px;
  font-size: 18px;
  color: #333;
}
</style> -->


<!--QUAGGA STATIC IMPORT-->
<!-- <template>
  <div>
    <div id="camera" style="width: 100%;"></div>
    <div>
      <p v-if="result">Detected barcode: {{ result }}</p>
      <p v-else>Not found</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: null,
    };
  },
  mounted() {
    this.initQuagga();
  },
  methods: {
    initQuagga() {
      const quaggaConf = {
        inputStream: {
          target: document.querySelector("#camera"),
          type: "LiveStream",
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment",
            aspectRatio: { min: 1, max: 2 }
          }
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader'] // Add more formats as needed
        },
      };

      if (!window.Quagga) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@ericblade/quagga2/dist/quagga.min.js';
        script.onload = () => this.startQuagga(quaggaConf);
        script.onerror = (e) => console.error('Error loading QuaggaJS script:', e);
        document.head.appendChild(script);
      } else {
        this.startQuagga(quaggaConf);
      }
    },
    startQuagga(config) {
      console.log('Starting Quagga with config:', config);
      Quagga.init(config, (err) => {
        if (err) {
          console.error('QuaggaJS initialization error:', err);
          return;
        }
        console.log('QuaggaJS initialized successfully');
        Quagga.start();
      });

      Quagga.onDetected((result) => {
        console.log('Barcode detected:', result);
        this.result = result.codeResult.code;
      });

      Quagga.onProcessed((result) => {
        if (result && result.codeResult) {
          this.result = result.codeResult.code;
        } else {
          this.result = null; // Reset result if no barcode is detected
        }
      });
    }
  },
  beforeDestroy() {
    if (window.Quagga) {
      Quagga.stop();
    }
  }
};
</script>

<style scoped>
#camera video {
  width: 100%;
  max-width: 640px;
}
</style> -->

<!--QIAGGA NPM IMPORT-->
<template>
    <div>
      <div id="camera" style="width: 100%;"></div>
      <div>

        <p class="code" v-if="result">Detected barcode: {{ result }}</p>
        <p class="code" v-else>Not found</p>
      </div>
    </div>
  </template>
  
  <script>
  import Quagga from '@ericblade/quagga2';
  
  export default {
    data() {
      return {
        result: null,
      };
    },
    mounted() {
      this.initQuagga();
    },
    methods: {
      initQuagga() {
        const quaggaConf = {
          inputStream: {
            target: document.querySelector("#camera"),
            type: "LiveStream",
            constraints: {
              width: { min: 640 },
              height: { min: 480 },
              facingMode: "environment",
              aspectRatio: { min: 1, max: 2 }
            }
          },
          decoder: {
            readers: [
              'code_128_reader',
              'ean_reader',
              'ean_8_reader',
              'upc_reader',
              'upc_e_reader'
            ] // Add more formats as needed
          },
        };
  
        this.startQuagga(quaggaConf);
      },
      startQuagga(config) {
        console.log('Starting Quagga with config:', config);
        Quagga.init(config, (err) => {
          if (err) {
            console.error('QuaggaJS initialization error:', err);
            return;
          }
          console.log('QuaggaJS initialized successfully');
          Quagga.start();
        });
  
        Quagga.onDetected((result) => {
          console.log('Barcode detected:', result);
          this.result = result.codeResult.code;
        });
  
        Quagga.onProcessed((result) => {
          if (result && result.codeResult) {
            this.result = result.codeResult.code;
          } 
        });
      }
    },
    beforeDestroy() {
      if (Quagga) {
        Quagga.stop();
      }
    }
  };
  </script>
  
  <style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #camera video {
    width: 100%;
    max-width: 640px;
  }
  .code{
    position: absolute;
    top:35rem;
    
  }
  </style>
  
