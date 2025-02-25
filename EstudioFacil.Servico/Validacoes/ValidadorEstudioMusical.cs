using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.InterfacesRepositorio;
using FluentValidation;

namespace EstudioFacil.Servico.Validacoes
{
    public class ValidadorEstudioMusical : AbstractValidator<EstudioMusical>
    {
        private readonly IRepositorioEstudioMusical _repositorioEstudioMusical;
        public ValidadorEstudioMusical(IRepositorioEstudioMusical repositorioEstudioMusical)
        {
            _repositorioEstudioMusical = repositorioEstudioMusical;
            ClassLevelCascadeMode = CascadeMode.Continue;

            RuleFor(EstudioMusical => EstudioMusical.Nome)
                .NotEmpty()
                .WithMessage("O campo Nome do Estúdio é obrigatório, por favor insira o nome do estúdio.")
                .MaximumLength(25)
                .WithMessage("O nome do estúdio excedeu o limite de 25 caracteres, digite um nome menor.");

            RuleFor(EstudioMusical => EstudioMusical)
                .Must(estudioMusical => _repositorioEstudioMusical.VerificaSeEstudioTemNomeRepetido(estudioMusical))
                .WithMessage("Já existe um estúdio musical com esse nome.");

            RuleFor(EstudioMusical => EstudioMusical.EstaAberto)
                .NotNull()
                .WithMessage("Por favor informe se o estúdio está aberto ou não.");
        }
    }
}