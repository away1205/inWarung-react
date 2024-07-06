function Profil() {
  return (
    <div className='home-content py-3 h-100'>
      <div className='row mt-4'>
        <div className='judul col-10'>
          <h1>Profil Saya</h1>
        </div>
      </div>
      <div className='table-container shadow-sm p-5 mt-3'>
        <div className='row px-4'>
          <div className='col-12'>
            <div className='form-group p-0'>
              <div className='row'>
                <div className='col-2 d-flex align-items-center '>
                  <p className='m-0'>Nama </p>
                </div>
                <div className='col-10'>
                  <input
                    type='text'
                    className='input-form form-control'
                    aria-describedby=''
                    name=''
                    value=''
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 mt-3'>
            <div className='form-group p-0'>
              <div className='row'>
                <div className='col-2 d-flex align-items-center '>
                  <p className='m-0'>Email</p>
                </div>
                <div className='col-10'>
                  <input
                    type='email'
                    className='input-form form-control'
                    aria-describedby=''
                    name=''
                    value=''
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 mt-3'>
            <div className='form-group p-0'>
              <div className='row'>
                <div className='col-2 d-flex align-items-center '>
                  <p className='m-0'>Password</p>
                </div>
                <div className='col-10'>
                  <input
                    type='password'
                    className='input-form form-control'
                    aria-describedby=''
                    name=''
                    value=''
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 mt-3'>
            <div className='form-group p-0'>
              <div className='row'>
                <div className='col-2 d-flex align-items-center '>
                  <p className='m-0'>Nama Bisnis</p>
                </div>
                <div className='col-10'>
                  <input
                    type='text'
                    className='input-form form-control'
                    aria-describedby=''
                    name=''
                    value=''
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
