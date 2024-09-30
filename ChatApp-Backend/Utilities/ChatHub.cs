using ChatApp_Backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp_Backend.Utilities
{
    public class ChatHub : Hub
    {
        private readonly IDictionary<string, UserConnection> _connections;
        private readonly string _botName;
        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _botName = "admin";
            _connections = connections;
        }

        public async Task JoinRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

            _connections[Context.ConnectionId] = conn;

            await Clients.Group(conn.ChatRoom)
                .SendAsync("ReceiveMessage", _botName, $"{conn.Username} has joined {conn.ChatRoom}");

            await SendConnectedUsers(conn.ChatRoom);
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection? userConnection))
            {
                await Clients.Groups(userConnection.ChatRoom)
                    .SendAsync("ReceiveMessage", userConnection.Username, message);
            }
        }

        public override Task OnDisconnectedAsync(Exception? e)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection? userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.ChatRoom).
                    SendAsync("ReceiveMessage", _botName, $"{userConnection.Username} has left the chat.");

                SendConnectedUsers(userConnection.ChatRoom);
            }

            return base.OnDisconnectedAsync(e);
        }

        public Task SendConnectedUsers(string room)
        {
            var users = _connections.Values
                .Where(x => x.ChatRoom == room)
                .Select(x => x.Username);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}