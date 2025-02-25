using Microsoft.Extensions.DependencyInjection;

namespace EstudioFacil.Testes.InjecaoDeDependencia
{
    public class TesteBase : IDisposable
    {
        protected ServiceProvider ServiceProvider;
        public TesteBase()
        {
            var servico = new ServiceCollection();
            ModuloDeInjecao.AdicionarDependeciasNoEscopo(servico);
            ServiceProvider = servico.BuildServiceProvider();
        }
        public void Dispose()
        {
            ServiceProvider.Dispose();
        }
    }
}