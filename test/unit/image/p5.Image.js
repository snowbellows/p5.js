suite('p5.Image', function() {
  var myp5;

  setup(function(done) {
    new p5(function(p) {
      p.setup = function() {
        myp5 = p;
        done();
      };
    });
  });

  teardown(function() {
    myp5.remove();
  });

  suite('p5.prototype.createImage', function() {
    test('it creates an image', function() {
      let img = myp5.createImage(10, 17);
      assert.isObject(img);
    });
  });

  suite('p5.Image', function() {
    test('it has necessary properties', function() {
      let img = new p5.Image(100, 100);
      assert.property(img, 'width');
      assert.property(img, 'height');
      assert.property(img, 'canvas');
      assert.property(img, 'loadPixels');
      assert.property(img, 'pixels');
      assert.property(img, 'updatePixels');
    });

    test('height and width are correct', function() {
      let img = new p5.Image(100, 100);
      myp5.pixelDensity(1);
      assert.strictEqual(img.width, 100);
      assert.strictEqual(img.height, 100);
    });
  });

  suite('p5.Image.prototype.resize', function() {
    test('it should resize the image', function() {
      let img = myp5.createImage(10, 17);
      myp5.pixelDensity(1);
      img.resize(10, 30);
      assert.strictEqual(img.width, 10);
      assert.strictEqual(img.height, 30);
    });
  });
});

suite('animated gifs', function() {
  var myp5;

  setup(function(done) {
    new p5(function(p) {
      p.setup = function() {
        myp5 = p;
        done();
      };
    });
  });

  teardown(function() {
    myp5.remove();
  });

  var imagePath = '';

  setup(function disableFileLoadError() {
    sinon.stub(p5, '_friendlyFileLoadError');
  });

  teardown(function restoreFileLoadError() {
    p5._friendlyFileLoadError.restore();
  });

  test('should gracefully handle calling play() on finished single loop GIFs', function() {
    imagePath = 'unit/assets/single-loop-gif-example';

    // var mySketch = function(this_p5) {
    // this_p5.preload = function() {
    return new Promise(function(resolve, reject) {
      myp5.loadImage(imagePath, resolve, reject);
    }).then(function(img) {
      // Set gifProperties to imitate a gif that has finished playing
      img.gifProperties.displayIndex = img.gifProperties.frames.length;
      img.gifProperties.loopCount = img.gifProperties.loopLimit;
      img.gifProperties.playing = false;

      img.play();
      assert.isFalse(img.playing);
    });
    // };

    // this_p5.setup = function() {

    // };

    // this_p5.draw = function() {

    // };
    // };
    // new p5(mySketch, null, false);
  });
});
