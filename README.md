# TrackVisualizer
Esta es una aplicación web de karaoke que permite a los usuarios cargar una pista de audio, una letra de canción con marca de tiempo y visualizar la letra de la canción sincronizada con la reproducción de audio, asi mismo como editarla y sincronizarla con precision con la cancion de fondo. 

<img src="https://i.ibb.co/g3DTY5V/Captura-de-pantalla-2023-08-26-182519.png">

## Caracteristicas principales
- La interfaz de usuario consta de varios elementos HTML, como campos de entrada, botones y visualizadores, que permiten al usuario interactuar con la aplicación.
- Los usuarios pueden cargar de letra de canción (JSON) desde su dispositivo.
- Los usuarios pueden cargar audios de canciónes (JSON) desde su dispositivo.
- Los datos del archivo de letra de canción se cargan y se utilizan para mostrar la letra sincronizada con la reproducción de audio.

### Visualización de Letra
- La letra de la canción se muestra en dos idiomas: español (lyricDisplaySPA) e inglés (lyricDisplayENG).
- La aplicación sincroniza letras con canciones dando informaciónen vivo de tiempo de inicio, tiempo de finalización y texto de la letra.
- Los usuarios pueden cambiar el color del texto y la sombra del texto para ambas versiones de la letra (español e inglés).

### Efectos Visuales
- La aplicación muestra visualmente el espectro de audio mientras se reproduce la música, creando una animación en tiempo real.
- Los efectos visuales se crean mediante la manipulación del lienzo y se sincronizan con la reproducción de audio.
- Se generan ondas de color en respuesta a la música que se está reproduciendo en tiempo real.
- Los usuarios pueden ajustar varios parámetros visuales, como tamaño y posición de un logotipo y rotación de efectos.

### Control de Reproducción
- Los usuarios pueden reproducir o pausar la pista de audio utilizando los botones de pausa.
- Los usuarios pueden avanzar o retroceder en la canción utilizando botones específicos.

<img src="https://i.ibb.co/7ztnNky/Captura-de-pantalla-2023-08-26-182941.png">

### Guardar Cambios en la Letra
- Los usuarios pueden editar la letra de la canción, cambiar el título de la canción y el autor.
- La edición de la letra incluye agregar nuevas líneas de letra, editar líneas existentes y eliminar líneas.
- Los cambios realizados en la letra de la canción se pueden guardar en el archivo JSON original.

# Notas Adicionales
- Asegúrese de que los archivos de letra de canción sigan el formato JSON esperado para que la aplicación los interprete correctamente.
- Se debe tener en cuenta que este código utiliza tecnologías web modernas, como Web Audio API y AJAX, por lo que se requiere un servidor web para el funcionamiento completo.

> Puede personalizar aún más la interfaz de usuario y los efectos visuales para adaptarlos a sus necesidades específicas.