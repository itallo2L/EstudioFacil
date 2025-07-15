using FluentValidation;
using LinqToDB.SqlQuery;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;

namespace EstudioFacil.Web.React.DetalhesDoProblema
{
    public static class ExtensaoDeDetalhesDoProblema
    {
        public static void ManipuladorDetalhesDoProblema(this IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            app.UseExceptionHandler(construtor =>
            {
                construtor.Run(async contexto =>
                {
                    var manipuladorDeExecao = contexto.Features.Get<IExceptionHandlerFeature>();
                    if (manipuladorDeExecao != null)
                    {
                        var erroDoManipuladorDaExcecao = manipuladorDeExecao.Error;
                        var detalhesDoProblema = new ProblemDetails
                        {
                            Instance = contexto.Request.HttpContext.Request.Path
                        };

                        if (erroDoManipuladorDaExcecao is ValidationException excecaoDeValidacao)
                        {
                            detalhesDoProblema.Title = "Erro de validação";
                            detalhesDoProblema.Detail = excecaoDeValidacao.Demystify().ToString();
                            detalhesDoProblema.Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1";
                            detalhesDoProblema.Status = StatusCodes.Status400BadRequest;
                            detalhesDoProblema.Extensions["ErroDeValidacao"] = excecaoDeValidacao.Errors
                            .GroupBy(nomePropriedade => nomePropriedade.PropertyName, mensagemErro => mensagemErro.ErrorMessage)
                            .ToDictionary(x => x.Key, x => x.ToList());
                        }
                        else if (erroDoManipuladorDaExcecao is SqlException sqlException)
                        {
                            detalhesDoProblema.Title = "Erro no Banco de Dados!";
                            detalhesDoProblema.Detail = sqlException.Message;
                            detalhesDoProblema.Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1";
                            detalhesDoProblema.Status = StatusCodes.Status500InternalServerError;
                        }
                        else
                        {
                            var logger = loggerFactory.CreateLogger("GlobalExceptionHandler");
                            logger.LogError($"Erro inesperado: {manipuladorDeExecao.Error}");
                            detalhesDoProblema.Title = $"{manipuladorDeExecao.Error.Message}";
                            detalhesDoProblema.Status = StatusCodes.Status500InternalServerError;
                            detalhesDoProblema.Detail = erroDoManipuladorDaExcecao.Demystify().ToString();
                        }

                        contexto.Response.StatusCode = detalhesDoProblema.Status.Value;
                        contexto.Response.ContentType = "application/problem+json";
                        var json = JsonConvert.SerializeObject(detalhesDoProblema);
                        await contexto.Response.WriteAsync(json);
                    }
                });
            });
        }
    }
}