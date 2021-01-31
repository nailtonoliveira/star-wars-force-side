import React from 'react'
import { Images } from './base64-images'

type Props = {
  master: keyof typeof Images
}

const MasterImage = ({ master }: Props): JSX.Element => {
  return <img src={Images[master]} />
}

export default MasterImage
