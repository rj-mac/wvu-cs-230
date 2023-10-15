  // Get the canvas element and its context
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  // Variables to track drawing state
  var isDrawing = false;
  var lastX = 0;
  var lastY = 0;

  // Event listeners to handle mouse and touch events
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  canvas.addEventListener('touchstart', startDrawing);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDrawing);

  // Function to start drawing
  function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = getMousePos(canvas, e);
  }

  // Function to draw on the canvas
  function draw(e) {
      if (!isDrawing) return;

      var [x, y] = getMousePos(canvas, e);

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = colorPicker.value; // Set the stroke color
      ctx.lineWidth = 4;       // Set the line width
      ctx.lineCap = 'round';   // Set the line cap style
      ctx.stroke();

      [lastX, lastY] = [x, y];
  }

  // Function to stop drawing
  function stopDrawing() {
      isDrawing = false;
  }

  // Function to get mouse position on the canvas
  function getMousePos(canvas, e) {
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var scaleY = canvas.height / rect.height;

      return [
          (e.clientX - rect.left) * scaleX,
          (e.clientY - rect.top) * scaleY
      ];
  }

  var colorPicker = document.getElementById('colorPicker');