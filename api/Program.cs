using SkiTKD.Data;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration
// .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true) //load base settings
    // .AddJsonFile($"appsettings.Development.json", optional: true) //load environment settings
    .AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true) //load local settings
    .AddEnvironmentVariables();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
builder.Services.AddDbContext<SkiTKDContext>();
builder.Services.AddSingleton<IVippsTokenService, VippsTokenService>();
builder.Services.AddSingleton<IGraphTokenService, GraphTokenService>();
builder.Services.AddTransient<IPersonRepository, PersonRepository>();
builder.Services.AddTransient<ILedsagerRepository, LedsagerRepository>();
builder.Services.AddTransient<IGradeRepository, GradeRepository>();
builder.Services.AddTransient<IClubRepository, ClubRepository>();
builder.Services.AddTransient<IPaymentRepository, PaymentRepository>();
builder.Services.AddTransient<IVinterleirRegistrationRepository, VinterleirRegistrationRepository>();
builder.Services.AddTransient<IGraderingRepository, GraderingRepository>();
builder.Services.AddTransient<IJubileumRepository, JubileumRepository>();
builder.Services.AddTransient<IOtherRepository, OtherRepository>();
builder.Services.AddTransient<IMailRepository, MailRepository>();
builder.Services.AddTransient<IVippsRepository, VippsRepository>();
builder.Services.AddTransient<IVinterleirAdminRepository, VinteleirAdminRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// else {
//     app.UseHttpsRedirection();
// }


app.UseAuthorization();

app.MapControllers();

app.Run();
