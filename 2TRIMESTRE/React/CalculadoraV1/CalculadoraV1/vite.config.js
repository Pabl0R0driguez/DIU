import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Ajustar el límite de advertencia para el tamaño de los chunks (en KB)
    chunkSizeWarningLimit: 1000, // Puedes poner el valor que prefieras (en KB)

    // Opciones de Rollup para dividir los chunks manualmente
    rollupOptions: {
      output: {
        // Manual chunking: separa las dependencias en su propio archivo
        manualChunks(id) {
          // Si el archivo se encuentra en node_modules, lo divide en un chunk llamado "vendor"
          if (id.includes('node_modules')) {
            return 'vendor'; // Este chunk contendrá las dependencias de node_modules
          }
        },
      },
    },
  },
});
