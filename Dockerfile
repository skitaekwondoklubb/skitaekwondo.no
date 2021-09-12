# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /build

# Copy everything else and build
COPY ./api/* ./api/
COPY ./data/* ./data/
RUN dotnet publish -c Release -o out ./api/*.csproj

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /build/out .
ENTRYPOINT ["dotnet", "SkiTKD.Api.dll"]
