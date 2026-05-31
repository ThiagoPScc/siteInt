import { Guide } from './types';

export const guidesData: Guide[] = [
  {
    id: "copiar-colar",
    title: "Copiar e Colar",
    subtitle: "Duplique e mova textos de um lugar para o outro sem digitar nada",
    category: "rapido",
    description: "Aprenda a selecionar, duplicar e inserir textos, imagens e links com facilidade.",
    iconName: "Copy",
    difficulty: "Fácil",
    timeToRead: "1 min",
    steps: [
      {
        title: "Passo 1: Selecionar o texto",
        text: "Clique com o botão ESQUERDO do mouse exatamente no começo da palavra ou texto que quer copiar. Mantendo o botão apertado, arraste o cursor até o final da frase. O pedaço escolhido deverá ficar azul ou destacado.",
        tip: "Dica: Você também pode dar dois cliques rápidos em uma palavra para selecioná-la inteira de uma vez só.",
        interactiveType: "copyPasteSelect"
      },
      {
        title: "Passo 2: Copiar",
        text: "Posicione a seta do mouse em cima da região azul destacada. Clique com o botão DIREITO do mouse e, no painel que se abre, escolha a opção 'Copiar'.",
        tip: "Atalho de Teclado: Segure a tecla CTRL e, com ela ainda apertada, pressione a letra C (CTRL + C).",
        interactiveType: "copyPasteCopy"
      },
      {
        title: "Passo 3: Colar",
        text: "Vá para o local onde você deseja colocar o texto (como uma conversa no WhatsApp, um arquivo do Word ou caixa de e-mail). Clique com o botão DIREITO do mouse e selecione a opção 'Colar'.",
        tip: "Atalho de Teclado: Segure a tecla CTRL e, com ela ainda apertada, pressione a letra V (CTRL + V).",
        interactiveType: "copyPasteColar"
      }
    ]
  },
  {
    id: "aumentar-letra",
    title: "Aumentar a Letra (Zoom)",
    subtitle: "Dificuldade para ler? Aprenda a dar zoom nas páginas da internet",
    category: "rapido",
    description: "Aprenda a ampliar a visualização de sites para facilitar a leitura de letras pequenas.",
    iconName: "ZoomIn",
    difficulty: "Fácil",
    timeToRead: "1 min",
    steps: [
      {
        title: "Passo 1: Usando o Teclado (Mais Rápido!)",
        text: "Com o site ou página aberto na tela, mantenha pressionada a tecla CTRL (fica no cantinho inferior esquerdo do seu teclado). Enquanto mantém CTRL segurado, aperte a tecla do sinal de mais (+) algumas vezes até o texto ficar no tamanho ideal.",
        tip: "Para diminuir a letra se ficar grande demais, segure a tecla CTRL e aperte o sinal de menos (-).",
        interactiveType: "fontSizeZoom"
      },
      {
        title: "Passo 2: Usando o Mouse no Navegador",
        text: "No canto superior direito da tela do seu navegador (como o Google Chrome), procure pelo ícone com três pontinhos verticais e clique nele. No menu, localize a palavra 'Zoom' e use os botões de mais (+) e menos (-) para escolher o tamanho confortável.",
        tip: "Dica extra: Para retornar imediatamente ao tamanho de letra original (100%), segure o CTRL e aperte o número 0.",
        interactiveType: "fontSizeMouse"
      }
    ]
  },
  {
    id: "cortar-foto",
    title: "Cortar uma Foto",
    subtitle: "Elimine as bordas e corte excessos das suas fotos e imagens",
    category: "rapido",
    description: "Aprenda a focar apenas na parte principal da sua imagem usando a função de recortar.",
    iconName: "Crop",
    difficulty: "Fácil",
    timeToRead: "2 min",
    steps: [
      {
        title: "Passo 1: Abrir a Imagem para Editar",
        text: "No seu computador, dê dois cliques na imagem que você deseja recortar. Ela será aberta no Visualizador de Fotos convencional do sistema.",
        tip: "Normalmente você pode clicar no botão escrito 'Editar Imagem' ou no ícone que se assemelha a um pincel/quadro no topo.",
        interactiveType: "cropOpen"
      },
      {
        title: "Passo 2: Ajustar os Cantos",
        text: "Após clicar em editar, círculos ou pequenas alças brancas surgirão nos cantos da fotografia. Clique com o botão esquerdo do mouse sobre um desses cantos, segure firme e arraste para dentro para eliminar as partes indesejadas (como bordas pretas ou fundos estranhos).",
        tip: "O restante que ficar fora da demarcação ficará acinzentado e será deletado ao salvar.",
        interactiveType: "cropAdjust"
      },
      {
        title: "Passo 3: Salvar como Cópia",
        text: "Clique no botão 'Salvar' ou, preferencialmente, em 'Salvar uma cópia' (no botão azul ou com o desenho de um disquete). Salvando como cópia, você evita substituir seu arquivo original no disco.",
        tip: "Pronto! O novo arquivo recortado estará salvo na mesma pasta do arquivo original com término modificador.",
        interactiveType: "cropSave"
      }
    ]
  },
  {
    id: "criar-pasta",
    title: "Criar uma Pasta",
    subtitle: "Entenda o armário virtual de arquivos e organize seus papéis",
    category: "rapido",
    description: "Aprenda a gerenciar novos diretórios para agrupar fotos, notas financeiras ou documentos importantes.",
    iconName: "FolderPlus",
    difficulty: "Fácil",
    timeToRead: "1.5 min",
    steps: [
      {
        title: "Passo 1: Escolher onde guardar",
        text: "Vá para o local onde você guardará os arquivos. Pode ser na sua tela inicial (Área de Trabalho ou Desktop) ou então dentro da biblioteca permanente chamada 'Documentos'.",
        tip: "O visualizador geral de pastas se chama 'Explorador de Arquivos' (pastinha amarela).",
        interactiveType: "folderPlace"
      },
      {
        title: "Passo 2: Menu do Mouse",
        text: "Aponte o mouse para qualquer área cinza ou sem nenhum ícone visível. Dê um clique único com o botão DIREITO do mouse para disparar o menu flutuante de ações.",
        tip: "Fique calmo! Menu com botão direito é usado como uma lista de ajudas rápidas que o Windows exibe.",
        interactiveType: "folderRightClick"
      },
      {
        title: "Passo 3: Nova Pasta & Novo Nome",
        text: "No painel, passe o mouse sobre o termo 'Novo' até surgir um subpainel complementar. Clique no botão de topo escrito 'Pasta'. Uma pastinha amarela surgirá com o texto marcado 'Nova Pasta'. Digite imediatamente o nome desejado (ex: 'Finanças 2026') e aperte ENTER.",
        tip: "Caso erre a digitação, dê um clique com o botão direito na pasta, procure 'Renomear' para escrever novamente.",
         interactiveType: "folderCreate"
      }
    ]
  },
  {
    id: "compactar-arquivos",
    title: "Compactar Arquivos (ZIP)",
    subtitle: "Seus arquivos são grandes demais? Junte-os em um pacotinho leve",
    category: "rapido",
    description: "Aprenda a agrupar múltiplos arquivos pesados em uma única pasta leve e compactada para fácil envio.",
    iconName: "Archive",
    difficulty: "Fácil",
    timeToRead: "2 min",
    steps: [
      {
        title: "Passo 1: Selecionar os arquivos desejados",
        text: "Na tela inicial ou em uma pasta, desenhe um 'cercadinho' sobre os arquivos: segure o botão esquerdo do mouse e arraste por cima de todos os PDF ou fotos que quer juntar.",
        tip: "Outra opção é segurar a tecla CTRL no teclado e ir clicando um por um nos arquivos selecionados.",
        interactiveType: "zipSelect"
      },
      {
        title: "Passo 2: Compactar no Windows",
        text: "Com todos os arquivos selecionados (ficando todos azulados), clique com o botão DIREITO sobre qualquer uma das fotos iluminadas. Escolha a opção complementar 'Compactar para...' (ou 'Enviar para') e selecione a opção 'Arquivo ZIP'.",
        tip: "Ao realizar esse processo, o computador começará a empacotar o peso total.",
        interactiveType: "zipCompress"
      },
      {
        title: "Passo 3: Pasta de Zíper Pronta!",
        text: "Automaticamente aparecerá uma nova pasta amarela que possui o detalhe de um 'zíper' metálico no desenho do ícone. Esse arquivo ZIP centraliza todos os arquivos de um jeito mais leve, perfeito para anexar no WhatsApp ou formulários.",
        tip: "Dica: Essa pasta compactada pode ser renomeada livremente sem desestruturar as fotos de dentro.",
        interactiveType: "zipDone"
      }
    ]
  },
  {
    id: "guia-windows",
    title: "Dominando o Básico do Windows",
    subtitle: "Navegação, atalhos úteis e cuidados gerais com o computador",
    category: "manual",
    description: "Entenda conceitualmente como organizar seu computador desktop, encontrar ferramentas sumidas e aplicar manutenções fáceis.",
    iconName: "Monitor",
    difficulty: "Médio",
    timeToRead: "4 min",
    steps: [
      {
        title: "1. Organização e Conceito de Pastas",
        text: "Assim como arrumar papéis soltos em gavetas sinalizadas, o Windows divide seu computador em categorias padrão automáticas: Documentos, Imagens, Vídeos e Downloads (onde cai tudo que é baixado do WhatsApp ou sites).",
        tip: "Sempre organize seus arquivos nelas para impedir que sua área de trabalho (Área Central) fique entupida.",
        interactiveType: "winFolders"
      },
      {
        title: "2. Barra de Tarefas e Atalhos Rápidos",
        text: "A Barra de Tarefas é a faixa preta ou cinza deitada na base da sua área de trabalho. Ela abriga atalhos de programas muito usados. É ótimo para descobrir quais janelas estão atualmente abertas no sistema (elas mostram uma bordinha azul ou pontinho iluminado embaixo do ícone).",
        tip: "Você pode fixar qualquer programa ali dando botão direito em cima do ícone e escolhendo 'Fixar na Barra de Tarefas'.",
        interactiveType: "winTaskbar"
      },
      {
        title: "3. Digitação Inteligente no Iniciar (O Segredo!)",
        text: "Não sabe onde foi parar um programa, documento ou site? Clique no botão Iniciar (com a bandeira do Windows no canto esquerdo da barra inferior) e, sem clicar em mais nada, apenas comece a digitar o que procura. O Windows abre o campo de busca de forma mágica e aponta a resposta.",
        tip: "Exemplo: clique no iniciar com o mouse e digite 'calculadora' para abrir o acessório rapidamente.",
        interactiveType: "winSearch"
      },
      {
        title: "4. Desinstalar apps de forma correta (Liberar Espaço)",
        text: "Jogar o ícone da sua área de trabalho para a lixeira não remove o programa do computador! É como apagar o cartão de visita de uma loja: a loja continua ativa. O jeito ideal: vá em Iniciar > Painel de Configurações (ícone de engrenagem) > Aplicativos. Localize o que quer deletar, clique e clique em 'Desinstalar'.",
        tip: "Isto de fato libera espaço em disco e acelera o processamento do seu PC.",
        interactiveType: "winUninstall"
      }
    ]
  },
  {
    id: "guia-figma",
    title: "Entendendo o Figma",
    subtitle: "Aprenda a operar a maior plataforma profissional de web design",
    category: "manual",
    description: "Descomplique a interface do Figma e aprenda as seções essenciais para colaborar e criar layouts.",
    iconName: "Figma",
    difficulty: "Avançado",
    timeToRead: "5 min",
    steps: [
      {
        title: "1. O que é o Figma e por que usar?",
        text: "O Figma é uma aplicação baseada na internet usada para desenhar designs de sites, aplicativos, e apresentações digitais de alto nível. Por rodar direto no navegador, você não precisa de uma máquina topo de linha para operá-lo, o que democratiza o acesso ao design.",
        tip: "A característica número um do Figma é o modo multijogador (multiplayer), no qual você vê as setinhas com os nomes dos seus colegas editando o mesmo documento juntos em tempo real.",
        interactiveType: "figmaIntro"
      },
      {
        title: "2. O Painel de Camadas (Lateral Esquerda)",
        text: "Cada quadrado, texto, círculo ou imagem que você desenha é posicionado em uma lista de camadas à esquerda da tela. Os objetos posicionados estruturalmente no topo da lista ficarão visualmente por cima de outros objetos no espaço do desenho principal.",
        tip: "Dando dois cliques em um nome na lista de camadas, você consegue renomear para melhor controle de organização (ex: 'Foto de Perfil').",
        interactiveType: "figmaLayers"
      },
      {
        title: "3. Barra de Ferramentas (Superior Central)",
        text: "A barra de fita abriga a ferramenta Seleção (Seta), a ferramenta Frame (onde delimitamos telas ou cartolinas), Formas Básicas (retângulos, círculos), ferramenta Caneta (vetoring livre) e Texto (T). É por ali que você cria qualquer novo conteúdo.",
        interactiveType: "figmaTools"
      },
      {
        title: "4. Painel de Propriedades (Lateral Direita)",
        text: "Quando você clica em qualquer desenho no seu rascunho, o menu da direita (sinalizado como 'Design') se ilumina. Nele você pode alterar cores de preenchimento (Fill), cor de contorno (Stroke), efeitos de sombra (Effects) e as fontes e tamanhos de textos.",
        tip: "É aqui que você faz o ajuste refinado para deixar seu projeto com acabamento profissional.",
        interactiveType: "figmaInspector"
      }
    ]
  },
  {
    id: "guia-ferramentas",
    title: "Ferramentas do Dia a Dia",
    subtitle: "Escreva e organize números usando serviços em nuvem gratuitos",
    category: "manual",
    description: "Aprenda a iniciar gratuitamente e tirar proveito de ferramentas que eliminam a necessidade de licenças caras.",
    iconName: "FileSpreadsheet",
    difficulty: "Médio",
    timeToRead: "5 min",
    steps: [
      {
        title: "1. Google Docs (O Substituto do Word)",
        text: "Um editor de textos moderno que dispensa licença do Office e salva cada caractere digitado imediatamente na nuvem. Você pode acessar seus textos de qualquer dispositivo simplesmente logando na sua conta Gmail.",
        tip: "Possui uma ferramenta sensacional chamada 'Digitação por Voz' para ditar textos inteiros sem precisar encostar no teclado.",
        interactiveType: "toolsDocs"
      },
      {
        title: "2. Google Sheets (O Substituto do Excel)",
        text: "Planilhas fáceis de operar para listas, contas domésticas ou finanças do mês. Seus dados se alinham em células e colunas e você pode criar somas automáticas. Caso mude uma taxa ou número de consumo simples, os totais se recalculam no mesmo instante.",
        tip: "Compartilhando o link, você e seu grupo de estudos podem ajustar os controles de gastos em tempo real.",
        interactiveType: "toolsSheets"
      },
      {
        title: "3. Canva (Edições e Designs em Minutos)",
        text: "Nada de lidar com Photoshop ou CorelDraw. O Canva é perfeito para produzir panfletos, convites ou currículos atraentes. Ao invés de uma tela preta assustadora, ele traz milhares de designs prontos. Basta clicar sobre as fotos e nomes de exemplo e colocar as suas informações.",
        tip: "Já traz as dimensões prontas de slides, folhas A4 ou publicações do Instagram de antemão.",
        interactiveType: "toolsCanva"
      },
      {
        title: "4. iLovePDF (A Mágica para seus Documentos)",
        text: "Precisa mandar 4 faturas separadas e a faculdade só aceita um anexo? O iLovePDF une múltiplos PDF de forma simples, comprime arquivos que estão muito pesados para envio via email, e pode transformar um PDF fechado de volta em texto editável do Word.",
        tip: "É 100% online, não pede downloads de programas e é gratuito.",
        interactiveType: "toolsIlovePdf"
      }
    ]
  }
];
