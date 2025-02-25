using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Filtros;
using System.Collections.Generic;

namespace EstudioFacil.Dominio.InterfacesRepositorio
{
    public interface IRepositorioEstudioMusical
    {
        List<EstudioMusical> ObterTodos(FiltroEstudioMusical? filtro = null);
        void Adicionar(EstudioMusical estudioMusical);
        void Atualizar(EstudioMusical estudioParaAtualizar);
        void Deletar(int id);
        EstudioMusical ObterPorId(int id);
        bool VerificaSeEstudioTemNomeRepetido(EstudioMusical estudioMusical);
    }
}