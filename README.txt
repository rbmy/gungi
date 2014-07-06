# Gungi - The Hunter x Hunter inspired Board game

## What is Gungi?

Gungi is a fictitious board game from the anime series [Hunter X Hunter](http://en.wikipedia.org/wiki/Hunter_x_hunter) written by Yoshihiro Togashi. Gungi first appears in the Chimera Ant season and becomes a significant and reoccurring topic. The game itself is inspired by Japanese Chess (also known as Shogi) and Go. The show and the manga or its creator do not give a large amount of details on the rules but thanks to the Hunter x Hunter community the game has come to life.

## But why design Gungi?
I am designing a web version of this board game for 2 major reasons: one, the game is unique and interesting; And two, I thought it'd be an interesting way to play with Angular.js. I'm not experienced in either game design or Angular but I'm hoping that through this project I'll gain some insight on both.

## The Rules and Details
A big thanks can be given to Japanese blogger Nishitsuji Sannkurou who posted the [rules and details](http://blog.goo.ne.jp/nishitsuji-sannkurou/e/aee5280f6c4109b22f594202947bcd2c) on his blog and a big thanks to the wonderful tumblrer who translated [them](http://hiromalo.tumblr.com/post/74510568781/rules-of-gungi).

I will be using Nishitsuji's rules and details as a guide for creating a web version of this game. Most of what is written below is either a direct grab of the English translation of Nishitsuji's post or some of my interpretation and notes.

The objective of the game is to capture the opponent's Commander. The Commander is most important piece, like the king is important in chess.

### The Board itself

As I said above, this game seems to be inspired by the chess variant shogi (or Japanese Chess) and the ages old game of Go. As a comparison, a shogi board is typically a 9 by 9 tiled rectangle of rows (ranks) and columns (files) and a Go board typically is a 19 by 19 grid, but for beginners is played on a 9 by 9 grid. Gungi is played on a 9 by 9 tiled board of rows (ranks) and columns (files), similar to that of shogi. Unlike chess (and like shogi), a Gungi board is not colored.

The game is played by 2 people, one who has black pieces and the other who has white pieces. Pieces can be active or can be part of a player's hand (more about that below). Also, pieces are discs with the kanji for their front name and back name. For our purposes, I will be placing an English alphabet letter to indicate the piece type.

### Phase 1: Initial Arrangement

At the start of the game each player decides who plays which color. Black goes first and white second. Each player has a territory on the board, which is the first 3 ranks of the respective players side. One of the elements that makes Gungi unique for shogi or chess, is the first phase of the battle: the initial arrangement. During this phase the players will take turns placing their pieces  wherever they want within their territory. During this phase all 46 pieces (23 for each color) must be placed on the board.

At this time only front pieces can be played and by the end of the phase, there must be at least one pawn in every file.

### Towers

Another element that make Gungi unique is its towers. In Gungi you are allowed to stack pieces. Towers are allowed to be 2-3 layers, or tiers, tall. Towers can be build by building on top of your other pieces (ie. placing a piece on top of a pawn) or by landing on an opponent's piece.

In a tower, two pieces of the same type and color are prohibited (like having 2 pawns in the same tower). It is however, okay to have two pieces of the same type from opposite sides in the same tower (like a black pawn and a white pawn).

Pieces at the top of the tower are allowed to move and the ones below become immobile. The lower tier pieces become mobile again, once the piece above is moved.

### Attacking the Opponent

As mentioned in the translation of Nishitsuji's rules, Gungi has two types of attacks: Mobile and immobile.

A mobile attack works in the same fashion as chess. If an opponent is in range and it's your turn you may strike the opponent's piece by occupying that piece's tile. The opponent's piece then moves to your hand. When attacking a tower, no matter how tall your tower or the opponent's tower, the top tier piece is attacked. Because an attack involves occupying the opposing pieces place, that means you will and on top of their tower. This puts you at risk of an immobile attack.

Since pieces that have another piece on top of them are considered immobile, they are not allowed to move across the board until the piece above is removed. Immobile attacks allow for opponents to regain mobility. An immobile attack allows you to attack a piece that is above or below you in a tower and add it to your hand. If the attacked piece is on the top tier, you just capture it. If the attacked piece is below, then the pieces above descend 1 tier down.

#### Checkmate

As mentioned above the objective of the game is to capture the opponent's Commander. When the Commander is in range of a mobile or immobile attack, it is in check. When the Commander is in check, it must avoid being captured by either running away, blocking an attack with another piece, or eliminating the opposing piece. If you are unable to do this then your opponent wins.

### The Pieces

Gungi has 2 colors to indicate player: white and black. Black pieces go first and white go second, the opposite of chess. Each piece has a front side and a back side, except the Commander (our version of the king). Here are the front and backs of each piece and their quantity, as written in the English translation of the rules:

Front ——————— Back (amount)
Commander————- N/A (1)
Captain —————— Pistol (2)
Samurai —————— Pike (2)
Spy ———————— Clandestinite(3)
Catapult —————— Lance (1)
Fortress ——————-Lance (1)
Hidden Dragon————Dragon King(1)
Prodigy———————Phoenix(1)
Bow ———————— Arrow (2)
Pawn ———————- Bronze (7)
Pawn ———————- Silver (1)
Pawn ———————- Gold (1)



## References

* [Go (Game)](en.wikipedia.org/wiki/Go_(game))
* [Shogi](en.wikipedia.org/wiki/Shogi)
* [English Translation of Nishitsuji's Rules](http://hiromalo.tumblr.com/post/74510568781/rules-of-gungi)
