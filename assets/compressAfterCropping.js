import Compressor from 'compressorjs'

export default function CompressAfterCropping (file, ChangeImage_) {
  // eslint-disable-next-line no-new
  new Compressor(file, {
    width: 800,
    height: 800,
    quality: 0.6,
    success (result) {
      ChangeImage_(result)
    },
    error (err) {
      // eslint-disable-next-line no-console
      console.log(err.message)
    }
  })
}
