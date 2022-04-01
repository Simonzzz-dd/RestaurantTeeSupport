import Compressor from 'compressorjs'

export default function CompressFile (file, ChangeImage_, cropper, time) {
  // eslint-disable-next-line no-new
  new Compressor(file, {
    width: 800,
    height: 800,
    quality: 0.6,
    success (result) {
      cropper.replace(URL.createObjectURL(result))
      setTimeout(() => {
        cropper.getCroppedCanvas().toBlob(function (blob) {
          blob.lastModified = Date.now()
          blob.name = 'zimmoCroppedImage'
          ChangeImage_(blob)
        })
      }, time)
    },
    error (err) {
      // eslint-disable-next-line no-console
      console.log(err.message)
    }
  })
}
