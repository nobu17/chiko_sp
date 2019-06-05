import EXIF from 'exif-js'
import imageCompression from 'browser-image-compression'
export default {
  async compressImageAsync(file) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 900,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(file, options)
      console.log(
        'compressedFile instanceof Blob',
        compressedFile instanceof Blob
      ) // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`)
      return compressedFile
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async getCompressImageDataUrl(file) {
    const img = await this.compressImageAsync(file)
    return imageCompression.getDataUrlFromFile(img)
  },
  transformAndDraw(canvas, ctx, drawImageArgs, orientation) {
    const img = drawImageArgs[0]
    const imgWidth = drawImageArgs[7]
    const imgHeight = drawImageArgs[8]

    switch (orientation) {
      case 3: // 画像が１８０度回転している時
        canvas.width = imgWidth
        canvas.height = imgHeight
        ctx.rotate(Math.PI)
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          -imgWidth,
          -imgHeight
        )
        ctx.rotate(-Math.PI)
        break
      case 6: // 画像が時計回りに９０度回っている時
        canvas.width = imgHeight
        canvas.height = imgWidth
        ctx.rotate(Math.PI * 0.5)
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          imgWidth,
          -imgHeight
        )
        // ctx.drawImage(img, 0, -img.height)
        ctx.rotate(-Math.PI * 0.5)
        break
      case 8: // 画像が反時計回りに９０度回っている時
        canvas.width = imgHeight
        canvas.height = imgWidth
        ctx.rotate(-Math.PI * 0.5)
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          -imgWidth,
          imgHeight
        )
        // ctx.drawImage(img, -img.width, 0)
        ctx.rotate(Math.PI * 0.5)
        break
      default:
        canvas.width = imgWidth
        canvas.height = imgHeight
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          imgWidth,
          imgHeight
        )
    }
  },
  getOrientationAsync(file) {
    return new Promise((resolve, reject) => {
      let orientation = 0
      try {
        EXIF.getData(file, () => {
          orientation = file.exifdata.Orientation
          if (!orientation) {
            orientation = 1
          }
          resolve(orientation)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}
