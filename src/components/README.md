El flujo de la aplicación funciona bajo el principio de 'Props bajan, eventos suben':

Todo el App.tsx que obtiene la fuente original mediante una sola variable de estado que es: SelectedMedId. En vez de crear estados adicionales para el control de un modal si estuviese abierto o si se seleciona un elemento. Ese estado alcanzaria el ID numerico o un null.

El paso de props. App define a la función HandleselectMedia y se pasapor MediaGrid mediante la prop Onselect. El Mediagrid no influye en esa función, es decir que se la da a cada Mediagrid.

Asimismo, tenemos al disparo del evento. Es cuando el usuario da click al boton "ver detalle", la tarjeta ejecuta onselect(data.id), avisando hacia arriba cual es el ID seleccionado. Lo siguiente seria la actualización de datos del app captura ID y actualizando selecteMediaID. Como último, tenemos los cálculos derivados, al renderizarse, el react calcula dos valores en tiempo de ejecución: SelectedMedia y isDetailOpened.