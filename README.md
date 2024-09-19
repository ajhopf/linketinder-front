# Linketinder | Front-end

## Introdução
Este projeto é a primeira versão do Linketinder, um projeto audacioso que visa facilitar a contratação de talentos por empresas. A aplicação consiste em uma mistura de Linkedin com Tinder, onde teremos candidatos em empresas em busca de um match perfeito.

Na versão final da aplicação, os candidatos e empresas poderão visualizar uma lista de potenciais matches de acordo com as suas competências / necessidades.

Esta aplicação visa reduzir a possibilidade de viés por parte dos contrantes e contratados e trazer uma visão estritamente técnica da possível compatibilidade de competências.

Neste momento ainda estamos em fase inicial da construção do aplicativo, portanto ainda dependemos da interação com o terminal para a visualização e inserção de novos cadastros.

## Executando o Sistema

Você poderá visualizar o sitema em funcionamento no link: https://linketinder-front.vercel.app/

Se você deseja executar o sistema diretamente em sua máquina faça o clone deste repositório, instale as dependências com o comando 'npm install' e execute o sistema com o comando 'npm start'.


Por padrão não existem empresas e candidatos cadastrados.
Em breve adicionaremos a funcionalidade que possibilita a inserção automática de candidatos, vagas, empresas e interações, facilitando a visualização das funcionalidades do sitema.

## Entendendo o Sistema

Atenção! A edição dos perfis ainda não foi adicionada ao sistema.

### Perfil de Candidato

Ao fazer o cadastro é possível escolher qual tipo de perfil você deseja criar: candidato ou empresa.

Ambos deverão adicionar competências que são relevantes para o seu perfil.

No perfil do candidato é possível visualizar todas as vagas disponíveis, além de observar um gráfico contendo o número de vagas por competência.

![img.png](img.png)

Ao posicionar o mouse sobre o card de uma vaga um modal será aberto contendo informações da vaga com mais detalhes e também é possível clicar no ícone no canto superior direito para curtir ou descurtir uma vaga.

O modal poderá ser fechado tanto ao clicar fora do card quanto ao clicar no botão 'close'
![img_1.png](img_1.png)

### Perfil de Empresa

No perfil da empresa também é possível observar um gráfico contendo a quantidade de candidatos por competência.

![img_2.png](img_2.png)

A empresa tabém possui dois componentes que não estão disponíveis para o candidato que são: criar vaga e minhas vagas

#### Tela de criação de vaga:

![img_3.png](img_3.png)

#### Tela de visualização das vagas da empresa:

Nesta tela é possível deletar vagas.

![img_4.png](img_4.png)