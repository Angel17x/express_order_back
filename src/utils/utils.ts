export class Utils {
  static formatIdentity(identity: string): string {
      const MIN_LENGTH = 4;
      const MAX_LENGTH = 11;
    
      // Verificar la longitud actual del valor de 'identity'
      const currentLength = identity.length;
    
      // Extraer la letra de 'identity'
      const letter = identity.charAt(0);
    
      // Rellenar con ceros a la izquierda si la longitud es menor a 11 y mayor o igual a 4
      if (currentLength < MAX_LENGTH && currentLength >= MIN_LENGTH) {
        const digits = identity.substring(1); // Obtener los dígitos después de la letra
        const zeros = '0'.repeat(MAX_LENGTH - currentLength); // Generar los ceros necesarios
        identity = letter + zeros + digits; // Construir el nuevo valor de 'identity' con los ceros a la izquierda
      } else if (currentLength < MIN_LENGTH) {
        identity = ''; // Reiniciar 'identity' si es menor a 4 caracteres
      }
    
      // Rellenar con ceros a la izquierda si la longitud es menor a 11
      if (currentLength < MAX_LENGTH) {
        identity = identity.padStart(MAX_LENGTH, '0');
      }
    
      return identity;
  }
}