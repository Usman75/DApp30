const Crud = artifacts.require("Crud");

contract("Crud", function (/* accounts */) {
  let crud = null;
  
  before(async () => {
    crud  = await Crud.deployed();
  });

  it('Should create an user', async () => {
    await crud.create('Usman');
    let user = await crud.read(1);
    assert(user[0].toNumber() == 1);
    assert(user[1] == "Usman");
  });

  it('should update an user', async () => {
    await crud.update(1,'Arslan');
    let user = await crud.read(1);
    assert(user[0].toNumber() == 1);
    assert(user[1]  == 'Arslan');
  });

  it('Should delelt an user', async () => {
    await crud.create('Ahmed');
    let user = await crud.read(2);
    assert(user[0].toNumber() == 2);
    assert(user[1]  == 'Ahmed');
    await crud.remove(2);
    try{
    await crud.read(2);
    } catch (e){
      assert(e.message.includes('User dose not exist!'));
      return;
    }
    assert(false);
  });

  it('Should not update user not-exist!', async () => {
    try{
    await curd.update(10,'Fatima');
    }catch(e) {
      assert(e.message.includes('User dose not exist!'));
      return;
    }
    assert(false);
  });
  
  it('Should not remove user that not-exists!', async () => {
    try{
      await crud.remove(2);
    }catch(e){
      assert(e.message.includes('User dose not exist!'));
      return;
    }
    assert(false);
  })
});
