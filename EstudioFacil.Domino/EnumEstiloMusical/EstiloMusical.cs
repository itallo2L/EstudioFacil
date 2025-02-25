using System.ComponentModel;

namespace EstudioFacil.Dominio.EnumEstiloMusical
{
    public enum EstiloMusical
    {
        [Description("Será selecionado quando o enum não for definido.")]
        EnumIndefinido,

        [Description("Gênero bastante rítmico, com grandes entregas vocais, letras simples e guitarra bastante presente.")]
        Blues,

        [Description("Gênero que possui ritmo não linear e sua maior marca é a improvisação.")]
        Jazz,

        [Description("Gênero de música erudito, que se caracteriza por apresentar uma instrumentação complexa e por ser executada em formato de sinfonia.")]
        MusicaClassica,

        [Description("Gênero composto por músicas da tradição caipira, por músicas românticas e por canções populares do sertanejo universitário.")]
        Sertanejo,

        [Description("Gênero onde a música serve como louvor, oração ou graças a Deus, Jesus Cristo e ao Espírito Santo.")]
        Gospel,

        [Description("Gênero onde a música é gerada através do uso de recursos digitais e tecnológicos, como sintetizadores, computadores ou programas de composição.")]
        Eletronica,

        [Description("Gênero com um ritmo repetitivo com instrumentos de percussão acompanhados de sons eletrônicos.")]
        Samba,
    }
}