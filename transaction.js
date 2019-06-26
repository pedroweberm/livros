class Transaction 
{
  constructor(doador, receptor, livro)
  {
    this.doador = doador;
    this.receptor = receptor;
    this.livro = livro;

    this.doadorOk = false;
    this.receptorOk = false;

    this.completed = false;
    this.sucess = false;
  }
  Good(id)
  {
    if (!this.completed)
    {
      if (this.doador.id === id){
        this.doadorOk = true;
      }
      elif(this.receptor.id === id){
        this.receptorOk = true;
      }
  
      if (this.doadorOk && this.receptorOk){
        this.completed = true;
        this.sucess = true;
      }
    }
  }
  Bad(id)
  {
    if (!this.completed)
    {
      if (this.doador.id === id || this.receptor.id === id){
        this.completed = true;
        this.sucess = false;
      }
    }
  }
}