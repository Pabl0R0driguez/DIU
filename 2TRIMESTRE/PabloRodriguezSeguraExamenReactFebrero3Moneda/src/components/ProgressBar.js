import React from 'react'
import "boostrap/dis/css/boostrap.min.css"

function ProgressBar() {
  return (
    <div className='contendorBarraProgreso'>
      <span className='progressText'>
            <div className='progress'>
                  <div className='progress-bar progress-bar-striped bg-danger progress-bar-animated'
                  role = "progressbar"
                  style>

                  </div>
            </div>
      </span>
    </div>
  )
}

export default ProgressBar