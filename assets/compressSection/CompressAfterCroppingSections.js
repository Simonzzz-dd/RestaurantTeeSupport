import Compressor from 'compressorjs'

export default function CompressAfterCroppingSections (file, ChangeImage_) {
  // eslint-disable-next-line no-new
  new Compressor(file, {
    width: 1200,
    height: 1200,
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
