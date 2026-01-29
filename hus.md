Feature: Gestión de Platillos

  Scenario: Registro exitoso de un platillo
    Given que el administrador está en el formulario de "Nuevo Platillo"
    When el administrador ingresa los siguientes datos:
      | Campo       | Valor                  |
      | Nombre      | Hamburguesa Trufada    |
      | Descripción | Carne angus y trufa    |
      | Precio      | 15.50                  |
      | Categoría   | Entradas               |
    And hace clic en el botón "Guardar"
    Then el sistema debe validar que los campos obligatorios estén completos
    And debe mostrar un mensaje de éxito "Platillo registrado correctamente"
    And el nuevo platillo debe aparecer en la lista general.

Feature: Visualización del Menú

  Scenario: Listado de platillos en el dashboard
    Given que existen platillos registrados en la base de datos
    When el administrador accede a la sección de "Menú"
    Then el sistema debe renderizar una tabla
    And cada fila debe mostrar el nombre, precio y estado del platillo
    And debe incluir un botón de "Editar" y "Eliminar" por cada registro.

Feature: Control de Disponibilidad

  Scenario: Cambiar estado de un platillo a agotado
    Given que el platillo "Ensalada César" tiene el estado "Disponible"
    When el administrador cambia el toggle de estado a "Agotado"
    Then el sistema debe actualizar el registro inmediatamente
    And la etiqueta de estado en la tabla debe cambiar su color a rojo
