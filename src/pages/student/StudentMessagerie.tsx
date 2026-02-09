import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockConversations, mockMessages } from "@/lib/mock-data";
import { Send, Paperclip } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function StudentMessagerie() {
  const [selectedConv, setSelectedConv] = useState(mockConversations[0]?.id);
  const [msg, setMsg] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-poppins font-bold">Messagerie</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
        {/* Conversations list */}
        <Card className="lg:col-span-1 overflow-hidden">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-poppins">Conversations</CardTitle></CardHeader>
          <CardContent className="p-0">
            {mockConversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                className={cn(
                  "w-full text-left p-4 border-b hover:bg-secondary/50 transition-colors",
                  selectedConv === conv.id && "bg-secondary"
                )}
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm">{conv.participants.find(p => p.role !== "etudiant")?.name}</p>
                  {conv.unreadCount > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5 font-poppins">{conv.unreadCount}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{conv.lastMessage}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{conv.lastMessageAt}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          <CardContent className="flex-1 p-4 overflow-auto space-y-3">
            {mockMessages.map(m => (
              <div key={m.id} className={cn("max-w-[80%]", m.senderRole === "etudiant" ? "ml-auto" : "mr-auto")}>
                <div className={cn(
                  "rounded-2xl px-4 py-3 text-sm",
                  m.senderRole === "etudiant" ? "bg-accent text-accent-foreground rounded-br-md" : "bg-secondary rounded-bl-md"
                )}>
                  {m.content}
                  {m.attachments?.map(a => (
                    <div key={a.name} className="mt-2 flex items-center gap-1 text-xs opacity-80">
                      <Paperclip className="h-3 w-3" /> {a.name}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{m.sentAt}</p>
              </div>
            ))}
          </CardContent>
          <div className="border-t p-4 flex gap-2">
            <Button variant="ghost" size="icon" className="shrink-0"><Paperclip className="h-4 w-4" /></Button>
            <Input placeholder="Écrire un message..." value={msg} onChange={e => setMsg(e.target.value)} />
            <Button size="icon" className="bg-warning text-warning-foreground hover:bg-warning/90 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
